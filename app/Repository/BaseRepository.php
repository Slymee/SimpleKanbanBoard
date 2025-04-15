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

    public function get()
    {
        return $this->model->all();
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(array $data)
    {
        return $this->model->update($data);
    }

    public function delete(string $id)
    {
        return $this->model->findOrFail($id)->delete();
    }

    abstract public function getModel();
}