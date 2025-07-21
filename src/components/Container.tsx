import { ReactNode } from "react";
import containerStyles from "../styles/Container.module.css";

interface ContainerProps {
    children: ReactNode;
    className?: string;
  }

export default function Container({ children}: ContainerProps) {   
    return <div className={containerStyles.container}>
        {children}
    </div>
}