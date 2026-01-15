<?php

namespace App\Services;

use App\Repositories\ConsultaProyectoRepositoryInterface;
use App\Models\Consulta_Proyecto;
use Illuminate\Database\Eloquent\Collection;

class ConsultaProyectoService
{
    protected $consultaProyectoRepository;

    public function __construct(ConsultaProyectoRepositoryInterface $consultaProyectoRepository)
    {
        $this->consultaProyectoRepository = $consultaProyectoRepository;
    }

    public function getAllConsultaProyectos(): Collection
    {
        return $this->consultaProyectoRepository->getAll();
    }

    public function getConsultaProyectoById(int $id): ?Consulta_Proyecto
    {
        return $this->consultaProyectoRepository->findById($id);
    }

    public function createConsultaProyecto(array $data): Consulta_Proyecto
    {
        return $this->consultaProyectoRepository->create($data);
    }

    public function updateConsultaProyecto(int $id, array $data): ?Consulta_Proyecto
    {
        return $this->consultaProyectoRepository->update($id, $data);
    }

    public function deleteConsultaProyecto(int $id): bool
    {
        return $this->consultaProyectoRepository->delete($id);
    }
}
