<?php

namespace App\Repository\Interface;

interface BaseInterface
{    
    public function get();

    public function create(array $data);

    public function update(array $data);

    public function delete(string $id);
}
