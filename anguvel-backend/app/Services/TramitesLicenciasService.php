<?php

namespace App\Services;

use App\Repositories\TramitesLicenciasRepositoryInterface;
use App\Models\Tramites_Licencias;
use Illuminate\Database\Eloquent\Collection;

class TramitesLicenciasService
{
    protected $tramitesLicenciasRepository;

    public function __construct(TramitesLicenciasRepositoryInterface $tramitesLicenciasRepository)
    {
        $this->tramitesLicenciasRepository = $tramitesLicenciasRepository;
    }

    public function getAllTramitesLicencias(): Collection
    {
        return $this->tramitesLicenciasRepository->getAll();
    }

    public function getTramitesLicenciasById(int $id): ?Tramites_Licencias
    {
        return $this->tramitesLicenciasRepository->findById($id);
    }

    public function createTramitesLicencias(array $data): Tramites_Licencias
    {
        return $this->tramitesLicenciasRepository->create($data);
    }

    public function updateTramitesLicencias(int $id, array $data): ?Tramites_Licencias
    {
        return $this->tramitesLicenciasRepository->update($id, $data);
    }

    public function deleteTramitesLicencias(int $id): bool
    {
        return $this->tramitesLicenciasRepository->delete($id);
    }
}
