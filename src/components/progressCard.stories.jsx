import ProgressCard from "./progressCard.jsx";

const meta = {
  title: "Progress Card",
  component: ProgressCard,
  argTypes: {
    status: {
      control: "select",
      options: ["Not Started", "In Progress", "Completed"],
    },
    progress: {
      control: "range",
      min: 0,
      max: 100,
    },
  },
};

export default meta;

export const InProgress = {
  args: {
    title: "Experience Builder",
    link: "https://www.drupal.org/project/experience_builder",
    status: "In Progress",
    progress: 88,
    footer: (
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <span>Last updated: 2 hours ago</span>
        <span>22 open issues</span>
      </div>
    ),
  },
};

export const Completed = {
  args: {
    ...InProgress.args,
    status: "Completed",
    progress: 100,
    footer: (
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <span>Last updated: 2 minutes ago</span>
        <span>No open issues</span>
      </div>
    ),
  },
};

export const NotStarted = {
  args: {
    ...InProgress.args,
    status: "Not Started",
    progress: 0,
    footer: (
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <span>Last updated: 5 hours ago</span>
        <span>922 open issues</span>
      </div>
    ),
  },
};
