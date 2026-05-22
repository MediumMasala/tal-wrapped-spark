import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { StoryPlayer } from "@/components/wrapped/StoryPlayer";
import { wrappedConfig } from "@/config/stats";

type WrappedSearch = {
  name: string;
  company: string;
  department?: string;
  bestManager?: string;
};

export const Route = createFileRoute("/wrapped")({
  validateSearch: (search: Record<string, unknown>): WrappedSearch => ({
    name: typeof search.name === "string" ? search.name : "there",
    company:
      typeof search.company === "string"
        ? search.company
        : wrappedConfig.companyName,
    department:
      typeof search.department === "string" ? search.department : undefined,
    bestManager:
      typeof search.bestManager === "string" ? search.bestManager : undefined,
  }),
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