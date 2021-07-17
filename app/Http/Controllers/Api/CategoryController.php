<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Api\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index(){
        $categories = Category::with('children')->where('parent_id',0)->get();
        return response()->json($categories);
    }

    public function show($id){
        $category = Category::find($id);
        return $category;

    }

    public function create(){

    }

    public function store(Request $request){
        $parent_id = $request->parent_id;
        $name = $request->name;

        $find = Category::where('slug',Str::slug($name))->first();

        if(!$find){
            $category = new Category();

            $category->name = $name;
            $category->parent_id = $parent_id;
            $category->slug = Str::slug($name);

            $category->save();
            return response()->json(Category::with('children')->where('parent_id',0)->get());
        }
        return response('',404)->json();
    }
}
