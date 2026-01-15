<?php

namespace App\Services;

use App\Repositories\SeguridadCiudadanaRepositoryInterface;
use App\Models\Seguridad_Ciudadana;
use Illuminate\Database\Eloquent\Collection;

class SeguridadCiudadanaService
{
    protected $seguridadCiudadanaRepository;

    public function __construct(SeguridadCiudadanaRepositoryInterface $seguridadCiudadanaRepository)
    {
        $this->seguridadCiudadanaRepository = $seguridadCiudadanaRepository;
    }

    public function getAllSeguridadCiudadana(): Collection
    {
        return $this->seguridadCiudadanaRepository->getAll();
    }

    public function getSeguridadCiudadanaById(int $id): ?Seguridad_Ciudadana
    {
        return $this->seguridadCiudadanaRepository->findById($id);
    }

    public function createSeguridadCiudadana(array $data): Seguridad_Ciudadana
    {
        return $this->seguridadCiudadanaRepository->create($data);
    }

    public function updateSeguridadCiudadana(int $id, array $data): ?Seguridad_Ciudadana
    {
        return $this->seguridadCiudadanaRepository->update($id, $data);
    }

    public function deleteSeguridadCiudadana(int $id): bool
    {
        return $this->seguridadCiudadanaRepository->delete($id);
    }
}
