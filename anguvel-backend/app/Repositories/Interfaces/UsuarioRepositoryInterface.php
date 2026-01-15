<?php

namespace App\Repositories;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Collection;

interface UsuarioRepositoryInterface
{
    public function getAll(): Collection;
    public function findById(int $id): ?Usuario;
    public function create(array $data): Usuario;
    public function update(int $id, array $data): ?Usuario;
    public function delete(int $id): bool;
}
