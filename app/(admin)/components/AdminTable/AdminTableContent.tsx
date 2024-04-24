import styles from "./AdminTable.module.css";
import Button from "@/app/components/Button/Button";
import { MdModeEdit } from "react-icons/md";
import { RiFileCopyFill } from "react-icons/ri";
import { LiaTrashAlt } from "react-icons/lia";
import { ColumnDefinition } from "./columnDefinition";

interface AdminTableContentProps<T> {
  data: T[];
  columns: ColumnDefinition<T>[];
  noDataLabel: string;
  onUpdate: (item: T) => void;
  onCopy: (item: T) => void;
  onDelete: (item: T) => void;
}

const AdminTableContent = <T,>({
  data,
  columns,
  noDataLabel,
  onUpdate,
  onCopy,
  onDelete,
}: AdminTableContentProps<T>) => {
  const columnsCount = columns.length + 1;

  return (
    <>
      <div
        className={styles.assetsTableWrapper}
        style={{
          gridTemplateColumns: `repeat(${columnsCount}, 1fr)`,
        }}
      >
        <div
          className={styles.assetsTableHeader}
          style={{ gridColumn: `span ${columnsCount}` }}
        >
          {columns.map((column) => {
            return <div key={column.header}>{column.header}</div>;
          })}
        </div>

        <div
          className={styles.assetsTableContent}
          style={{ gridColumn: `span ${columnsCount}` }}
        >
          {data.length === 0 && (
            <div
              className={styles.assetsNoTableContent}
              style={{ gridColumn: `span ${columnsCount}` }}
            >
              {noDataLabel}
            </div>
          )}
          {data.map((item, index) => (
            <div
              key={index}
              className={styles.assetsTableItem}
              style={{ gridColumn: `span ${columnsCount}` }}
            >
              {columns.map((column, index2) => {
                const asset = item[column.field];
                return (
                  <div
                    className={styles.assetItem}
                    data-label={column.header}
                    key={index2}
                  >
                    {String(asset)}
                  </div>
                );
              })}
              <div className={styles.assetsTableActions}>
                <Button
                  variant="update"
                  className={styles.actionButton}
                  onClick={() => onUpdate(item)}
                  Icon={MdModeEdit}
                  shape="original"
                  tooltip="Update"
                />
                <Button
                  variant="cancel"
                  className={styles.actionButton}
                  onClick={() => onCopy(item)}
                  Icon={RiFileCopyFill}
                  shape="original"
                  tooltip="Copy ID"
                />
                <Button
                  variant="delete"
                  className={styles.actionButton}
                  Icon={LiaTrashAlt}
                  shape="original"
                  onClick={() => onDelete(item)}
                  tooltip="Delete"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminTableContent;
