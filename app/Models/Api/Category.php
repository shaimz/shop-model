<?php

namespace App\Models\Api;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $table = 'category';

    public function child(){
        return $this->hasMany(Category::class,'parent_id','id');
    }
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id','id');
    }
    public function children(){
        return $this->child()->with('children');
    }
}
