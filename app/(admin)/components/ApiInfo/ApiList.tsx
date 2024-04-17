"use client";

import useOrigin from "@/app/hooks/useOrigin";
import ApiInfo from "./ApiInfo";
import Heading from "../Heading/Heading";
import { capitalize } from "@/lib/capitalize";
import styles from "./ApiInfo.module.css";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

const ApiList = ({ entityName, entityIdName }: ApiListProps) => {
  const origin = useOrigin();
  const baseUrl = `${origin}/api`;

  return (
    <div className={styles.apiListWrapper}>
      <Heading
        title="API"
        description={`API calls for ${capitalize(entityName)}`}
        showSidebarButton={false}
      />
      <div className={styles.apiList}>
        <ApiInfo
          title="GET"
          description={`${baseUrl}/${entityName}`}
          variant="Public"
        />
        <ApiInfo
          title="GET"
          description={`${baseUrl}/${entityName}/{${entityIdName}}`}
          variant="Public"
        />
        <ApiInfo
          title="POST"
          description={`${baseUrl}/${entityName}`}
          variant="Admin"
        />
        <ApiInfo
          title="PATCH"
          description={`${baseUrl}/${entityName}/{${entityIdName}}`}
          variant="Admin"
        />
        <ApiInfo
          title="DELETE"
          description={`${baseUrl}/${entityName}/{${entityIdName}}`}
          variant="Admin"
        />
      </div>
    </div>
  );
};

export default ApiList;
