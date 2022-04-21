package com.supermercado.producto.controllers;

import com.supermercado.producto.entity.Producto;
import com.supermercado.producto.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


public class ProductoControllers {

    @Autowired
    private ProductoRepository productoRepository;

    @RequestMapping(value = "api/productos/{id}", method = RequestMethod.GET)
    public ResponseEntity<Producto> getProducto(@PathVariable Long id) {
        Optional<Producto> foundProducto = productoRepository.findById(id);
        if (foundProducto.isPresent()) {
            return ResponseEntity.ok(foundProducto.get());
        }
        Map<String, String> errorResponse = new LinkedHashMap<>();
        errorResponse.put("error", "Not found");
        errorResponse.put("message", "Producto not found");
        errorResponse.put("status", HttpStatus.NOT_FOUND.toString());
        return new ResponseEntity(errorResponse, HttpStatus.NOT_FOUND);

    }

    @RequestMapping(value = "api/productos", method = RequestMethod.POST)
    public ResponseEntity createProducto(@RequestBody Producto producto) {
        Map<String,String> response = new LinkedHashMap<>();
        try{
            productoRepository.save(producto);
            response.put("success","registered product!");
            response.put("message","registered product success!");
            response.put("status", HttpStatus.OK.toString());
            return new ResponseEntity(response, HttpStatus.OK);
        }catch (Exception e){
            response.put("error","Error");
            response.put("message", "An error occurred while registering the product!");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.toString());
            return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }




    @RequestMapping(value = "api/productos", method = RequestMethod.GET)
    public List<Producto> listProductos() {
        return productoRepository.findAll();
    }




    @RequestMapping(value = "api/productos", method = RequestMethod.POST)
    public ResponseEntity editProducto(@RequestBody Producto producto, @PathVariable Long id) {
        Map<String, String> response = new HashMap<>();
        try {
            Producto user = productoRepository.findById(id).get();
            user.setNumeroPro(producto.getNumeroPro());
            user.setNombre(producto.getNombre());
            user.setDescripProducto(producto.getDescripProducto());
            user.setValorProducto(producto.getValorProducto());
            user.setFechavencProducto(producto.getFechavencProducto());
            response.put("success","producto edit!");
            response.put("message","producto edit success!");
            response.put("status", HttpStatus.OK.toString());
            productoRepository.save(producto);
            return new ResponseEntity(response, HttpStatus.OK);
        }catch (Exception e){
            response.put("error","Not found");
            response.put("message", "User not found!");
            response.put("status", HttpStatus.NOT_FOUND.toString());
            return new ResponseEntity(response, HttpStatus.NOT_FOUND);
        }

    }

    @RequestMapping(value = "api/productos", method = RequestMethod.POST)
    public ResponseEntity deleteProducto(@PathVariable Long id) {
        Map<String, String> response = new HashMap<>();
        try {
            Producto producto = productoRepository.findById(id).get();
            productoRepository.delete(producto);
            response.put("success","product delete!");
            response.put("message","product delete success!");
            response.put("status", HttpStatus.OK.toString());
            return new ResponseEntity(response, HttpStatus.OK);
        }catch (Exception e){
            response.put("error","Not found");
            response.put("message", "Product not found!");
            response.put("status", HttpStatus.NOT_FOUND.toString());
            //response.put("exception", e.toString());
            return new ResponseEntity(response, HttpStatus.NOT_FOUND);
        }
    }

}
