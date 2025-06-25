import { useState } from "react";

const PetitionFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    title: "",
    dateSince: "",
    dateUntil: "",
    idCustomer: ""
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      title: "",
      dateSince: "",
      dateUntil: "",
      idCustomer: ""
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-3 bg-light rounded-3 shadow-sm">
        <div className="row g-3 align-items-end">
            <div className="col-md-3">
            <label className="form-label">Título</label>
            <input
                type="text"
                className="form-control"
                name="title"
                value={filters.title}
                onChange={handleChange}
                placeholder="Buscar por título"
            />
            </div>

            <div className="col-md-3">
            <label className="form-label">Fecha desde</label>
            <input
                type="date"
                className="form-control"
                name="dateSince"
                value={filters.dateSince}
                onChange={handleChange}
            />
            </div>

            <div className="col-md-3">
            <label className="form-label">Fecha hasta</label>
            <input
                type="date"
                className="form-control"
                name="dateUntil"
                value={filters.dateUntil}
                onChange={handleChange}
            />
            </div>

            <div className="col-md-2">
            <label className="form-label">ID Cliente</label>
            <input
                type="text"
                className="form-control"
                name="idCustomer"
                value={filters.idCustomer}
                onChange={handleChange}
            />
            </div>

            {/* Botones separados abajo en columnas independientes */}
            <div className="col-md-1 d-grid">
            <button type="submit" className="btn btn-primary">
                Filtrar
            </button>
            </div>
            <div className="col-md-1 d-grid">
            <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>
                Limpiar
            </button>
            </div>
        </div>
        </form>

  );
};

export default PetitionFilter;
