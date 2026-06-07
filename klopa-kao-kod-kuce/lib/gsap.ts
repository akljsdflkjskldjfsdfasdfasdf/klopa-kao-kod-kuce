// Centralno mesto za GSAP — registruje ScrollTrigger jednom (samo na klijentu)
// i re-eksportuje sve što komponentama treba.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };
