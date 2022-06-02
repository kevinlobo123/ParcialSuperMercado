package com.supermercado.producto.controllers;

import com.supermercado.producto.entity.Producto;
import com.supermercado.producto.repository.ProductoRepository;
import org.apache.logging.log4j.message.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


public class ProductoControllers {

    @Autowired
    private ProductoRepository productoRepository;
    private Message message = new Message();

    @RequestMapping(value = "api/productos/{id}", method = RequestMethod.GET)
    public Optional<Producto> getProducto(@PathVariable Long id){
        Optional<Producto> foundProducto = productoRepository.findById(id);
        if(foundProducto.isPresent()){
            return foundProducto;
        }
        return null;
    }

    @RequestMapping(value = "api/productos", method = RequestMethod.POST)
    public ResponseEntity createProducto(@RequestBody Producto producto){
        Map<String,String> response = new LinkedHashMap<>();
        try{

            productoRepository.save(producto);
            return message.viewMessage(HttpStatus.OK,"success","registered product success!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.INTERNAL_SERVER_ERROR,"error","An error occurred while registering the user!");
        }

    }






    @RequestMapping(value = "api/productos", method = RequestMethod.GET)
    public List<Producto> listProductos() {
        return productoRepository.findAll();
    }


    @RequestMapping(value = "api/productos/{id}", method = RequestMethod.PUT)
    public ResponseEntity editProducto(@RequestBody Producto newProducto, @PathVariable Long id){
        Map<String, String> response = new HashMap<>();
        try {
            Producto producto = productoRepository.findById(id).get();
            producto.setNumeroPro(newProducto.getNumeroPro());
            producto.setNombre(newProducto.getNombre());
            producto.setDescripProducto(newProducto.getDescripProducto());
            producto.setValorProducto(newProducto.getValorProducto());
            producto.setFechavencProducto(newProducto.getFechavencProducto());
            productoRepository.save(producto);

            return message.viewMessage(HttpStatus.OK,"success","user edit success!!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","User not found!");
        }
    }
    @RequestMapping(value = "api/productos/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteProducto(@PathVariable Long id){
        Map<String, String> response = new HashMap<>();
        try {
            Producto producto = productoRepository.findById(id).get();
            productoRepository.delete(producto);
            return message.viewMessage(HttpStatus.OK,"success","user delete success!!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","User not found!");
        }


    }
}



