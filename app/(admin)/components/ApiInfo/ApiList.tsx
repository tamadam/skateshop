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
          badgeVariant="public"
          badgeLabel="public"
        />
        <ApiInfo
          title="GET"
          description={`${baseUrl}/${entityName}/{${entityIdName}}`}
          badgeVariant="public"
          badgeLabel="public"
        />
        <ApiInfo
          title="POST"
          description={`${baseUrl}/${entityName}`}
          badgeVariant="admin"
          badgeLabel="admin"
        />
        <ApiInfo
          title="PATCH"
          description={`${baseUrl}/${entityName}/{${entityIdName}}`}
          badgeVariant="admin"
          badgeLabel="admin"
        />
        <ApiInfo
          title="DELETE"
          description={`${baseUrl}/${entityName}/{${entityIdName}}`}
          badgeVariant="admin"
          badgeLabel="admin"
        />
      </div>
    </div>
  );
};

export default ApiList;
