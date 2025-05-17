import { getVehicleList, Vehicle } from '@/lib/api/vehicel/vehicel';
import React from 'react';
import VehicleTable from '@/components/VehicleTable';

const PAGE_SIZE = 10;

type SortDirection = 'ASC' | 'DESC';

const Assignment2Page = () => {
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
  const [page, setPage] = React.useState(1);
  const [pageSize] = React.useState(PAGE_SIZE);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [lastPage, setLastPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState({ vin_number: '' });
  const [filter, setFilter] = React.useState({ model: '' });
  const [sort, setSort] = React.useState<{ field_name: string; direction: SortDirection }>({ field_name: '', direction: 'ASC' });

  React.useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const response = await getVehicleList({
          filter,
          search,
          sort,
          pagination: { page_id: page, page_size: pageSize },
        });
        setVehicles(response.vehicles as Vehicle[]);
        setTotalRecords(response.pagination.total_record);
        setLastPage(response.pagination.last_page);
      } catch (error) {
        console.error('Failed to fetch vehicles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [page, pageSize, search, filter, sort]);

  // Handlers for VehicleTable
  const handleSearch = (searchObj: any) => {
    setSearch(searchObj);
    setPage(1);
  };
  const handleApplyFilter = (filterObj: any) => {
    setFilter(filterObj);
    setPage(1);
  };
  const handleApplySort = (sortObj: any) => {
    setSort(sortObj);
    setPage(1);
  };
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };
  const handleClickRow = (row: Vehicle) => {
    // Example: alert(JSON.stringify(row));
    // You can navigate or show details here
    alert(`Clicked row: ${row.model}`);
  };

  return (
    <VehicleTable
      vehicles={vehicles}
      nullValue="-"
      isShowTableBar={true}
      isShowIndex={true}
      isLoading={loading}
      currentPage={page}
      totalRecords={totalRecords}
      lastPage={lastPage}
      pageSize={pageSize}
      onApplyFilter={handleApplyFilter}
      onApplySort={handleApplySort}
      onClickRow={handleClickRow}
      onChangePage={handleChangePage}
      onSearch={handleSearch}
    />
  );
};

export default Assignment2Page; 