<?php

namespace App\Repositories;

use App\Models\Consulta_Proyecto;
use Illuminate\Database\Eloquent\Collection;

interface ConsultaProyectoRepositoryInterface
{
    public function getAll(): Collection;
    public function findById(int $id): ?Consulta_Proyecto;
    public function create(array $data): Consulta_Proyecto;
    public function update(int $id, array $data): ?Consulta_Proyecto;
    public function delete(int $id): bool;
}
