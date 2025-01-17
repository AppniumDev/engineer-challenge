import { createColumnHelper } from "@tanstack/table-core";
import { Badge } from "~/src/components/Badge";
import { capitalizeString } from "~/src/utils/string-utils";
import Select from "react-select";
import {
  PolicyEntity,
  PolicyEntityInsuranceTypeEnum,
  PolicyEntityStatusEnum,
} from "~/src/types/generated";
import { useAppDispatch, useAppSelector } from "~/src/store/hooks";
import {
  setInsuranceStatus,
  setInsuranceType,
  setSearchCustomerName,
  setSearchProvider,
} from "./policiesSlice";
import { useMemo } from "react";
import { TableTextCell } from "~/src/components/Table/TableTextCell";

// Derivate dropdown values from the enum
const insuranceTypeOptions = Object.values(PolicyEntityInsuranceTypeEnum).map(
  (insuranceType) => ({
    value: insuranceType,
    label: capitalizeString(insuranceType),
  })
);
// Derivate dropdown values from the enum
const insuranceStatusOptions = Object.values(PolicyEntityStatusEnum).map(
  (insuranceStatus) => ({
    value: insuranceStatus,
    label: capitalizeString(insuranceStatus),
  })
);

const columnHelper = createColumnHelper<PolicyEntity>();

export const generateTableColumnsPolicies = ({ t }) => {
  const baseTPath = "policies.table.headers";
  return [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      // Ugly style, I know.
      header: () => <div style={{ minWidth: 290 }}>#</div>,
      meta: {
        filterComponent: () => <></>,
      },
    }),
    columnHelper.accessor(
      (row) => `${row?.customer?.firstName} ${row?.customer?.lastName}`,
      {
        id: "customerName",
        cell: (info) => {
          // Merge all relatives names
          const relatives = info.row.original.relatives
            .map(({ relative }) => `${relative.firstName} ${relative.lastName}`)
            .join(",");

          const relativesString =
            info.row.original.relatives.length > 0 ? `(${relatives})` : "";

          return (
            <TableTextCell
              value={`${info.getValue()} ${relativesString}`}
              searchValue={info.column.getFilterValue() as string}
            />
          );
        },
        header: () => <span>{t(`${baseTPath}.customerName`)}</span>,
        meta: {
          customFilterAction: ({ value, dispatch }) => {
            dispatch(setSearchCustomerName(value));
          },
        },
      }
    ),
    columnHelper.accessor("provider", {
      header: () => <span>{t(`${baseTPath}.provider`)}</span>,
      cell: (info) => (
        <TableTextCell
          value={info.getValue()}
          searchValue={info.column.getFilterValue() as string}
        />
      ),
      meta: {
        customFilterAction: ({ value, dispatch }) => {
          dispatch(setSearchProvider(value));
        },
      },
    }),
    columnHelper.accessor("insuranceType", {
      header: () => <span>{t(`${baseTPath}.insuranceType`)}</span>,
      cell: (info) => <div>{capitalizeString(info.getValue())}</div>,
      meta: {
        filterComponent: () => {
          const dispatch = useAppDispatch();

          // Get data from redux store
          const { insuranceType: insuranceTypeFilters } = useAppSelector(
            ({ policiesView }) => policiesView.filters
          );

          // Get only selected options
          const insuranceTypeSelectedOptions = useMemo(() => {
            if (!insuranceTypeFilters) return [];
            return insuranceTypeOptions.filter(({ value }) =>
              insuranceTypeFilters.includes(value)
            );
          }, [insuranceTypeFilters]);

          return (
            <div className="flex w-full">
              <Select
                className="w-56 h-12 pt-1 basic-single"
                classNamePrefix="select"
                value={insuranceTypeSelectedOptions}
                isMulti
                isSearchable
                name="color"
                options={insuranceTypeOptions}
                onChange={(selectedOptions) => {
                  const filteredValues = selectedOptions?.map(
                    ({ value }) => value
                  );
                  if (filteredValues) {
                    dispatch(setInsuranceType(filteredValues));
                  }
                }}
              />
            </div>
          );
        },
      },
    }),
    columnHelper.accessor("status", {
      header: () => <span>{t(`${baseTPath}.status`)}</span>,
      cell: (info) => (
        <div>
          <Badge status={info.getValue()} />
        </div>
      ),
      meta: {
        filterComponent: () => {
          const dispatch = useAppDispatch();

          // Get data from redux store
          const { insuranceStatus: insuranceStatusFilters } = useAppSelector(
            ({ policiesView }) => policiesView.filters
          );

          // Get only selected options
          const insuranceStatusSelectedOptions = useMemo(() => {
            if (!insuranceStatusFilters) return [];
            return insuranceStatusOptions.filter(({ value }) =>
              insuranceStatusFilters.includes(value)
            );
          }, [insuranceStatusFilters]);

          return (
            <div className="flex w-full">
              <Select
                className="w-56 h-12 pt-1 basic-single"
                classNamePrefix="select"
                value={insuranceStatusSelectedOptions}
                isMulti
                isSearchable
                name="color"
                options={insuranceStatusOptions}
                onChange={(selectedOptions) => {
                  const filteredValues = selectedOptions?.map(
                    ({ value }) => value
                  );
                  if (filteredValues) {
                    dispatch(setInsuranceStatus(filteredValues));
                  }
                }}
              />
            </div>
          );
        },
      },
    }),
  ];
};

export const mapPoliciesToTableData = (policies: PolicyEntity[]) => {
  return policies;
};
