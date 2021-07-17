<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Api\Category;
use App\Models\Api\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    protected $categories = [];

    public function index($slug = 'all'){
        if($slug && $slug !== 'all'){
            $data = Category::where('slug',$slug)->first();
            array_push($this->categories,$data->id);

            $category = Category::find($data->id);

            $categories = $this->recursiveCategory($category);

            $products = Product::whereIn('category_id',$categories)->with('category')->get();
            return response()->json($products);
        }
        $products = Product::where('status',1)->get();
//        var_export($slug);
        return response()->json($products);
    }
    public function recursiveCategory($category){
        $category_id = $category->id;
        if($find = Category::where('parent_id',$category_id)->get()){
            if(!$find){
                return $this->categories;
            }
            foreach($find as $cat){
                array_push($this->categories,$cat->id);
                $this->recursiveCategory($cat);
            }
        }
        return $this->categories;
    }

    public function show($slug){
        $product = Product::where('url',$slug)->first();
        return response()->json($product);
    }

    public function create(){

    }

    public function store(Request $request){
        $parent_id = $request->parent_id;
        $name = $request->name;

        $find = Product::where('url',Str::slug($name))->first();

        if(!$find){
            $product = new Product();

            $product->name = $name;
            $product->parent_id = $parent_id;
            $product->slug = Str::slug($name);

            $product->save();
            return response()->json(Product::with('children')->where('parent_id',0)->get());
        }
        return response('',404)->json();
    }
}
