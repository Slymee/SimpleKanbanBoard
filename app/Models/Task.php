<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'tasks';

    protected $fillable = [
        'title',
        'description',
        'priority',
        'status',
        // 'created_by',
        // 'updated_by',
        'created_at',
        'updated_at',
    ];

    protected static function booted()
    {
        
    }

    public function creator()
    {
        return $this->belongsTo(User::class);
    }

    public function updater()
    {
        return $this->belongsTo(User::class);
    }
}
