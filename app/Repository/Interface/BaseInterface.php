<?php

namespace App\Repository\Interface;

interface BaseInterface
{    
    public function get($sortBy, $sortOrder);

    public function create(array $data);

    public function update(array $data, string $id);

    public function delete(string $id);
}
