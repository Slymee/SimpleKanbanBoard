<?php

namespace App\Repository;

use App\Repository\Interface\BaseInterface;
use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository implements BaseInterface
{
    // protected $model;

    public function __construct(protected Model $model)
    {
    }

    public function get($sortBy, $sortOrder)
    {
        return $this->model->orderBy($sortBy, $sortOrder)->get();
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(array $data, string $id)
    {
        return $this->model->findOrFail($id)->update($data);
    }

    public function delete(string $id)
    {
        return $this->model->findOrFail($id)->delete();
    }

    abstract public function getModel();
}