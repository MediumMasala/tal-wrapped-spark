import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { StoryPlayer } from "@/components/wrapped/StoryPlayer";
import { wrappedConfig } from "@/config/stats";

const searchSchema = z.object({
  name: fallback(z.string(), "there").default("there"),
  company: fallback(z.string(), wrappedConfig.companyName).default(
    wrappedConfig.companyName,
  ),
});

export const Route = createFileRoute("/wrapped")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Your Wrapped · Tal Boss" },
      {
        name: "description",
        content: "A personalized year-in-review story, powered by Tal Boss.",
      },
      { property: "og:title", content: "Your Wrapped · Tal Boss" },
      {
        property: "og:description",
        content: "Tap through your team's year.",
      },
    ],
  }),
  component: WrappedPage,
});

function WrappedPage() {
  const { name } = Route.useSearch();
  const navigate = useNavigate();
  return (
    <StoryPlayer
      name={name}
      onClose={() => navigate({ to: "/" })}
    />
  );
}