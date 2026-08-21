"use client";

import { useMemo, useRef, useState, type CSSProperties } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { servicePath, services as allServices } from "@/lib/content";
import { cn } from "@/lib/utils";

const ACCENT = "#FFA028";
const SECONDARY = "#34d399";
const RADIUS = 2.05;
const VERTEX_COUNT = 5;

type Vertex = {
  slug: string;
  shortTitle: string;
  category: string;
  icon: LucideIcon;
  x: number;
  y: number;
};

function buildVertices(): Vertex[] {
  return allServices.slice(0, VERTEX_COUNT).map((service, index) => {
    const angle = -Math.PI / 2 + (index * (Math.PI * 2)) / VERTEX_COUNT;
    return {
      slug: service.slug,
      shortTitle: service.shortTitle,
      category: service.category,
      icon: service.icon,
      x: Math.cos(angle) * RADIUS,
      y: Math.sin(angle) * RADIUS,
    };
  });
}

function PentagonGlass({ vertices }: { vertices: Vertex[] }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    vertices.forEach((v, i) => {
      if (i === 0) shape.moveTo(v.x, v.y);
      else shape.lineTo(v.x, v.y);
    });
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, [vertices]);

  return (
    <mesh geometry={geometry} position={[0, 0, -0.06]}>
      <meshPhysicalMaterial
        color="#0a0b0e"
        transparent
        opacity={0.55}
        roughness={0.28}
        metalness={0.65}
        clearcoat={1}
        clearcoatRoughness={0.25}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function PentagonEdges({ vertices, hovered }: { vertices: Vertex[]; hovered: number | null }) {
  const edges = useMemo(
    () =>
      vertices.map((v, i) => {
        const next = vertices[(i + 1) % vertices.length];
        return {
          key: `${i}-${(i + 1) % vertices.length}`,
          from: i,
          to: (i + 1) % vertices.length,
          points: [
            [v.x, v.y, 0] as [number, number, number],
            [next.x, next.y, 0] as [number, number, number],
          ],
        };
      }),
    [vertices],
  );

  return (
    <group>
      {edges.map((edge) => {
        const active = hovered !== null && (edge.from === hovered || edge.to === hovered);
        const color = active ? ACCENT : SECONDARY;
        return (
          <group key={edge.key}>
            <Line points={edge.points} color={color} lineWidth={active ? 5 : 2} transparent opacity={active ? 0.4 : 0.12} />
            <Line points={edge.points} color={color} lineWidth={active ? 2 : 1.1} transparent opacity={active ? 1 : 0.45} />
          </group>
        );
      })}
    </group>
  );
}

function VertexPoint({
  vertex,
  index,
  hovered,
  onHover,
  onLeave,
}: {
  vertex: Vertex;
  index: number;
  hovered: number | null;
  onHover: (index: number) => void;
  onLeave: () => void;
}) {
  const isHovered = hovered === index;
  const Icon = vertex.icon;
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!glowRef.current) return;
    const target = isHovered ? 1.55 : 1;
    glowRef.current.scale.lerp(new THREE.Vector3(target, target, target), 0.15);
    const material = glowRef.current.material as THREE.MeshBasicMaterial;
    material.opacity = THREE.MathUtils.lerp(material.opacity, isHovered ? 0.9 : 0.45, 0.15);
  });

  return (
    <group position={[vertex.x, vertex.y, 0]}>
      <mesh ref={glowRef}>
        <circleGeometry args={[0.16, 24]} />
        <meshBasicMaterial color={isHovered ? ACCENT : SECONDARY} transparent opacity={0.45} toneMapped={false} />
      </mesh>
      <Html center sprite zIndexRange={[10, 0]} distanceFactor={6.2}>
        <Link
          href={servicePath(vertex.slug)}
          onPointerEnter={() => onHover(index)}
          onPointerLeave={onLeave}
          onFocus={() => onHover(index)}
          onBlur={onLeave}
          className="group/point relative block select-none rounded-full outline-none"
          aria-label={vertex.shortTitle}
        >
          <span
            className={cn(
              "grid place-items-center rounded-full border backdrop-blur-md transition-all duration-300 ease-out",
              isHovered
                ? "h-[52px] w-[52px] border-[var(--pentagon-accent,#FFA028)]/70 bg-[var(--pentagon-accent,#FFA028)]/15 shadow-[0_0_28px_rgba(255,160,40,0.55)]"
                : "h-10 w-10 border-white/15 bg-white/[0.04] shadow-[0_0_12px_rgba(52,211,153,0.25)]",
            )}
          >
            <Icon
              className={cn(
                "transition-all duration-300",
                isHovered ? "h-6 w-6 text-[var(--pentagon-accent,#FFA028)]" : "h-4 w-4 text-emerald-200/80",
              )}
              aria-hidden="true"
            />
          </span>
          <span
            className={cn(
              "pointer-events-none absolute left-1/2 top-full mt-2 w-max -translate-x-1/2 overflow-visible whitespace-nowrap bg-black/70 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300",
              isHovered ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
            )}
          >
            {vertex.shortTitle}
          </span>
        </Link>
      </Html>
    </group>
  );
}

function PentagonScene({
  reducedMotion,
  hovered,
  setHovered,
}: {
  reducedMotion: boolean;
  hovered: number | null;
  setHovered: (index: number | null) => void;
}) {
  const vertices = useMemo(() => buildVertices(), []);
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useThree((state) => state.pointer);
  const parallax = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!groupRef.current) return;

    if (reducedMotion) {
      groupRef.current.rotation.set(-0.28, 0, 0.05);
      return;
    }

    const t = state.clock.elapsedTime;
    parallax.current.x = THREE.MathUtils.lerp(parallax.current.x, pointer.x * 0.18, 0.04);
    parallax.current.y = THREE.MathUtils.lerp(parallax.current.y, pointer.y * 0.1, 0.04);

    groupRef.current.rotation.y = t * 0.12 + parallax.current.x;
    groupRef.current.rotation.x = -0.28 + Math.sin(t * 0.35) * 0.05 - parallax.current.y;
    groupRef.current.rotation.z = Math.sin(t * 0.22) * 0.03;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.09;
  });

  return (
    <group ref={groupRef} rotation={[-0.28, 0, 0]}>
      <PentagonGlass vertices={vertices} />
      <PentagonEdges vertices={vertices} hovered={hovered} />
      {vertices.map((vertex, index) => (
        <VertexPoint
          key={vertex.slug}
          vertex={vertex}
          index={index}
          hovered={hovered}
          onHover={setHovered}
          onLeave={() => setHovered(null)}
        />
      ))}
    </group>
  );
}

const CANVAS_STYLE: CSSProperties = {
  "--pentagon-accent": ACCENT,
  width: "100%",
  height: "100%",
  display: "block",
  background: "transparent",
} as CSSProperties;

const GL_OPTIONS = { antialias: true, alpha: true };
const CAMERA_OPTIONS = { position: [0, 0, 6.4] as [number, number, number], fov: 42 };

export default function ServicesPentagon({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={CAMERA_OPTIONS}
      gl={GL_OPTIONS}
      resize={{ scroll: false, debounce: 0 }}
      style={CANVAS_STYLE}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={0.9} color="#fff5e6" />
      <pointLight position={[-3, -2, 3]} intensity={0.5} color={SECONDARY} />
      <pointLight position={[0, 0, 4]} intensity={0.35} color={ACCENT} />
      <PentagonScene reducedMotion={reducedMotion} hovered={hovered} setHovered={setHovered} />
    </Canvas>
  );
}
