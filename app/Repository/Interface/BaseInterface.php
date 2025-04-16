<?php

namespace App\Repository\Interface;

interface BaseInterface
{    
    public function get();

    public function create(array $data);

    public function update(array $data, string $id);

    public function delete(string $id);
}
