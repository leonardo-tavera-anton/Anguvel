<?php

namespace App\Repositories;

use App\Models\Gestion_Tributaria_Pagos;
use Illuminate\Database\Eloquent\Collection;

interface GestionTributariaPagosRepositoryInterface
{
    public function getAll(): Collection;
    public function findById(int $id): ?Gestion_Tributaria_Pagos;
    public function create(array $data): Gestion_Tributaria_Pagos;
    public function update(int $id, array $data): ?Gestion_Tributaria_Pagos;
    public function delete(int $id): bool;
}
