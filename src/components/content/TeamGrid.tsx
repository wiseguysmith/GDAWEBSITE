import Image from "next/image";
import type { TeamMember } from "@/content/types";
import { features } from "@/config/features";

type TeamGridProps = {
  members: readonly TeamMember[];
  /** Show full bios (About page) rather than the credential line only. */
  bios?: boolean;
};

/** Returns only members that are approved with a portrait and bio. */
export function approvedMembers(members: readonly TeamMember[]): TeamMember[] {
  if (!features.team) return [];
  return members.filter((m) => m.approved && m.portrait && m.bio && m.name && m.role);
}

/**
 * Four-up portrait grid. Renders nothing at all unless real, approved content
 * exists (handoff §11 section 8) — callers should also skip the Section.
 */
export function TeamGrid({ members, bios = false }: TeamGridProps) {
  const list = approvedMembers(members);
  if (list.length === 0) return null;
  return (
    <ul className="grid gap-x-(--gutter) gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {list.map((m) => (
        <li key={m.name} className="flex flex-col gap-3">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-elevated">
            <Image src={m.portrait} alt={`Portrait of ${m.name}`} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="text-body font-semibold text-fg">{m.name}</p>
            <p className="text-small text-fg-2">{m.role}</p>
            <p className="text-small text-fg-3">{m.credential}</p>
          </div>
          {bios ? <p className="text-small text-fg-2">{m.bio}</p> : null}
        </li>
      ))}
    </ul>
  );
}
