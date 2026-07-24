package com.ecom.order.exception;

public class OutofStockException extends RuntimeException{
    public OutofStockException(String message){
        super(message);
    }

}
