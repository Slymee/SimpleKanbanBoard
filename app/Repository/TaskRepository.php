<?php

namespace App\Repository;

use App\Models\Task;
use App\Repository\Interface\TaskInterface;

class TaskRepository extends BaseRepository implements TaskInterface
{
    public function __construct()
    {
        $this->model = $this->getModel();    
    }

    public function getModel()
    {
        return new Task();
    }
}