import { Breadcrumb } from "react-bootstrap";
import { FC } from "react";

interface Props {
  titleURL: string;
  thisPageUrl: string;
  thisPageTitle: string;
}

export const BreadCrumb: FC<Props> = ({
  titleURL,
  thisPageUrl,
  thisPageTitle,
}) => {
  return (
    <>
      <Breadcrumb className="mp__breadcrumb">
        <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item href={`/${thisPageUrl}`}>{titleURL}</Breadcrumb.Item>
        <Breadcrumb.Item active>{thisPageTitle}</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
};
