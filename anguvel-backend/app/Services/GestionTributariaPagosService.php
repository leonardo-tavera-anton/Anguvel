<?php

namespace App\Services;

use App\Repositories\GestionTributariaPagosRepositoryInterface;
use App\Models\Gestion_Tributaria_Pagos;
use Illuminate\Database\Eloquent\Collection;

class GestionTributariaPagosService
{
    protected $gestionTributariaPagosRepository;

    public function __construct(GestionTributariaPagosRepositoryInterface $gestionTributariaPagosRepository)
    {
        $this->gestionTributariaPagosRepository = $gestionTributariaPagosRepository;
    }

    public function getAllGestionTributariaPagos(): Collection
    {
        return $this->gestionTributariaPagosRepository->getAll();
    }

    public function getGestionTributariaPagosById(int $id): ?Gestion_Tributaria_Pagos
    {
        return $this->gestionTributariaPagosRepository->findById($id);
    }

    public function createGestionTributariaPagos(array $data): Gestion_Tributaria_Pagos
    {
        return $this->gestionTributariaPagosRepository->create($data);
    }

    public function updateGestionTributariaPagos(int $id, array $data): ?Gestion_Tributaria_Pagos
    {
        return $this->gestionTributariaPagosRepository->update($id, $data);
    }

    public function deleteGestionTributariaPagos(int $id): bool
    {
        return $this->gestionTributariaPagosRepository->delete($id);
    }
}
