import { getIconComponent } from "@/lib/getIconComponent";

type Props = {
  icon?: string;
};
export default function WhyUsIcon({ icon }: Props) {
  return (() => {
    const Icon = getIconComponent(icon);
    return Icon ? (
      <span className="shrink-0 w-12 h-12 rounded-lg bg-main-color/10 flex items-center justify-center">
        <Icon className="size-6 text-main-color" />
      </span>
    ) : null;
  })();
}
