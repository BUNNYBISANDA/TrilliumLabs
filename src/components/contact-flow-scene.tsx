"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export function ContactFlowScene({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const targetCanvas = canvas;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({
      canvas: targetCanvas,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.35, 7);

    const group = new THREE.Group();
    group.scale.setScalar(1.02);
    scene.add(group);

    const glow = new THREE.PointLight(0xf1b7aa, 10, 8);
    glow.position.set(1.8, -0.15, 2.4);
    scene.add(glow);

    const ambient = new THREE.AmbientLight(0xffd5c9, 1.25);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(-2, 2, 4);
    scene.add(keyLight);

    const railMaterial = new THREE.LineBasicMaterial({
      color: 0xf1b7aa,
      transparent: true,
      opacity: 0.72,
    });
    const railPoints = [
      new THREE.Vector3(-2.65, 0.86, -0.06),
      new THREE.Vector3(-1.35, 0.86, -0.06),
      new THREE.Vector3(-0.45, 0.18, -0.06),
      new THREE.Vector3(0.55, -0.34, -0.06),
      new THREE.Vector3(1.72, -0.34, -0.06),
    ];
    const rail = new THREE.Line(new THREE.BufferGeometry().setFromPoints(railPoints), railMaterial);
    group.add(rail);

    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd8cf,
      transparent: true,
      opacity: 0.9,
    });
    const nodes = railPoints.slice(0, -1).map((point) => {
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.055, 18, 18), nodeMaterial);
      node.position.copy(point);
      group.add(node);
      return node;
    });

    const inbox = new THREE.Group();
    const inboxMaterial = new THREE.MeshStandardMaterial({
      color: 0x21120f,
      emissive: 0x2b100b,
      metalness: 0.18,
      roughness: 0.42,
    });
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf1b7aa,
      emissive: 0x4b1811,
      metalness: 0.18,
      roughness: 0.28,
    });
    const inboxBack = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.82, 0.08), inboxMaterial);
    const inboxBase = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.16, 0.22), edgeMaterial);
    inboxBase.position.y = -0.42;
    inboxBase.position.z = 0.09;
    const inboxLip = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.08, 0.18), edgeMaterial);
    inboxLip.position.set(0, 0.1, 0.1);
    inbox.add(inboxBack, inboxBase, inboxLip);
    inbox.position.set(2.28, -0.44, 0);
    inbox.rotation.x = -0.14;
    group.add(inbox);

    const targetGlow = new THREE.Mesh(
      new THREE.RingGeometry(0.68, 0.72, 64),
      new THREE.MeshBasicMaterial({
        color: 0xf1b7aa,
        transparent: true,
        opacity: 0.34,
        side: THREE.DoubleSide,
      }),
    );
    targetGlow.position.set(2.28, -0.44, -0.02);
    group.add(targetGlow);

    const mailMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd6ce,
      emissive: 0x4c1a12,
      metalness: 0.1,
      roughness: 0.22,
      transparent: true,
    });
    const foldMaterial = new THREE.LineBasicMaterial({
      color: 0x7b342a,
      transparent: true,
      opacity: 0.75,
    });

    function createMail() {
      const mail = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.34, 0.04), mailMaterial.clone());
      const fold = new THREE.LineSegments(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-0.23, 0.12, 0.04),
          new THREE.Vector3(0, -0.03, 0.04),
          new THREE.Vector3(0.23, 0.12, 0.04),
          new THREE.Vector3(0, -0.03, 0.04),
          new THREE.Vector3(-0.22, -0.12, 0.04),
          new THREE.Vector3(0, -0.03, 0.04),
          new THREE.Vector3(0.22, -0.12, 0.04),
          new THREE.Vector3(0, -0.03, 0.04),
        ]),
        foldMaterial.clone(),
      );
      mail.add(body, fold);
      group.add(mail);
      return { mail, body, fold };
    }

    const mails = Array.from({ length: 5 }, createMail);

    function pointOnFlow(progress: number) {
      const clamped = THREE.MathUtils.clamp(progress, 0, 1);
      if (clamped < 0.34) {
        const t = clamped / 0.34;
        return new THREE.Vector3(THREE.MathUtils.lerp(-2.7, -1.35, t), 0.86, 0.2);
      }
      if (clamped < 0.68) {
        const t = (clamped - 0.34) / 0.34;
        return new THREE.Vector3(THREE.MathUtils.lerp(-1.35, 0.55, t), THREE.MathUtils.lerp(0.86, -0.34, t), 0.2);
      }
      const t = (clamped - 0.68) / 0.32;
      return new THREE.Vector3(THREE.MathUtils.lerp(0.55, 2.08, t), -0.34, 0.2);
    }

    function resize() {
      const rect = targetCanvas.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    }

    let frame = 0;
    let animationId = 0;
    const clock = new THREE.Clock();

    function animate() {
      const time = clock.getElapsedTime();
      group.rotation.y = Math.sin(time * 0.22) * 0.08;
      targetGlow.scale.setScalar(1 + Math.sin(time * 1.6) * 0.04);
      targetGlow.rotation.z = time * 0.1;
      inbox.position.y = -0.44 + Math.sin(time * 1.2) * 0.015;

      nodes.forEach((node, index) => {
        node.scale.setScalar(1 + Math.sin(time * 2 + index * 0.75) * 0.18);
      });

      mails.forEach(({ mail, body, fold }, index) => {
        const progress = (time * 0.18 + index * 0.2) % 1;
        const position = pointOnFlow(progress);
        const next = pointOnFlow(Math.min(progress + 0.02, 1));
        mail.position.copy(position);
        mail.rotation.z = Math.atan2(next.y - position.y, next.x - position.x);
        mail.rotation.y = Math.sin(time * 1.2 + index) * 0.18;
        const fadeIn = THREE.MathUtils.smoothstep(progress, 0, 0.12);
        const fadeOut = 1 - THREE.MathUtils.smoothstep(progress, 0.88, 1);
        const opacity = THREE.MathUtils.clamp(fadeIn * fadeOut, 0, 1);
        const scale = 0.82 + Math.sin(progress * Math.PI) * 0.2;
        mail.scale.setScalar(scale);
        body.material.opacity = opacity;
        fold.material.opacity = opacity * 0.75;
      });

      glow.intensity = 9 + Math.sin(time * 1.4) * 1.6;
      renderer.render(scene, camera);

      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(animate);
      } else if (frame < 1) {
        frame += 1;
        animationId = requestAnimationFrame(animate);
      }
    }

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      rail.geometry.dispose();
      railMaterial.dispose();
      nodeMaterial.dispose();
      nodes.forEach((node) => node.geometry.dispose());
      inboxBack.geometry.dispose();
      inboxBase.geometry.dispose();
      inboxLip.geometry.dispose();
      inboxMaterial.dispose();
      edgeMaterial.dispose();
      targetGlow.geometry.dispose();
      (targetGlow.material as THREE.Material).dispose();
      mails.forEach(({ mail, body, fold }) => {
        body.geometry.dispose();
        body.material.dispose();
        fold.geometry.dispose();
        fold.material.dispose();
        mail.clear();
      });
    };
  }, []);

  return (
    <div className={cn("relative min-h-[18rem] overflow-hidden lg:min-h-[22rem]", className)} aria-label="Animated emails moving through a scoping flow">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-[var(--page-accent,#f1b7aa)]/35 bg-black/20 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--page-secondary,#f3c7bd)] backdrop-blur-sm">
        Scoping flow
      </div>
      <div className="pointer-events-none absolute bottom-5 right-5 rounded-full border border-[var(--page-accent,#f1b7aa)]/35 bg-black/20 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--page-secondary,#f3c7bd)] backdrop-blur-sm">
        Email to scope
      </div>
    </div>
  );
}
