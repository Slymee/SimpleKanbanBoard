<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskFormRequest;
use App\Http\Resources\ErrorResource;
use App\Http\Resources\TaskResource;
use App\Repository\Interface\TaskInterface;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    public function __construct(protected TaskInterface $taskRepo) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = $this->taskRepo->get();
        return TaskResource::collection($tasks);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskFormRequest $request): JsonResponse
    {
        try {
            $task = $this->taskRepo->create($request->validated());
            
            return response()->json([
                'success' => true,
                'data' => new TaskResource($task)
            ], 201);
        } catch (\Exception $e) {
            return response()->json(
                new ErrorResource(
                    ['server' => ['Something went wrong']],
                    'Failed to create task: ' . $e->getMessage(),
                    500
                )
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskFormRequest $request, string $id): JsonResponse
    {
        try {
            $task = $this->taskRepo->getModel()->findOrFail($id);

            $this->taskRepo->update($request->validated(), $id);
            return response()->json([
                'success' => true,
                'message' => 'Task updated successfully',
                'data' => new TaskResource($task->refresh())
            ]);
        } catch (\Exception $e) {
            return response()->json(
                new ErrorResource(
                    ['server' => ['Update failed']],
                    'Failed to update task: ' . $e->getMessage(),
                    500
                )
            );
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            if ($this->taskRepo->delete($id)) {
                return response()->json([
                    'success' => true,
                    'message' => 'Task deleted successfully'
                ]);
            }

            throw new \Exception('Task deletion failed');
        } catch (\Exception $e) {
            return response()->json(
                new ErrorResource(
                    ['server' => ['Deletion failed']],
                    'Failed to delete task: ' . $e->getMessage(),
                    500
                )
            );
        }
    }
}
