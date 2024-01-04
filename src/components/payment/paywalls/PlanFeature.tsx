import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  feature: string;
}

export const PlanFeature = ({ icon, feature }: Props) => {
  return (
    <div className="flex text-sm md:text-md" key={feature}>
      {icon}
      <div className="ml-1.5">{feature}</div>
    </div>
  );
};
