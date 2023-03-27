import { PropsWithChildren } from "react";

const PageContainer = ({ children }: PropsWithChildren) => (
  <div className="page-container">{children}</div>
);

export default PageContainer;
