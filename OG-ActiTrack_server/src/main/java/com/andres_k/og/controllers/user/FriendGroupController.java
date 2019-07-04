package com.andres_k.og.controllers.user;

import com.andres_k.og.config.Restricted;
import com.andres_k.og.models.http.FriendRequestHandler;
import com.andres_k.og.models.item.FriendGroup;
import com.andres_k.og.services.FriendGroupService;
import com.andres_k.og.utils.tools.Console;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping("/user/friend")
public class FriendGroupController {
    private final FriendGroupService friendGroupService;

    @Autowired
    public FriendGroupController(FriendGroupService friendGroupService) {
        this.friendGroupService = friendGroupService;
    }

    @Restricted
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> addFriend(@RequestHeader String Authorization, @RequestBody FriendRequestHandler friendRequest) {
        try {
            this.friendGroupService.addFriend(Authorization, friendRequest);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (EntityNotFoundException ex) {
            Console.log("[Friend/add]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception ex) {
            Console.log("[Friend/add]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Restricted
    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<?> deleteFriend(@RequestHeader String Authorization, @RequestBody FriendRequestHandler friendRequest) {
        try {
            this.friendGroupService.deleteFriend(Authorization, friendRequest);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (EntityNotFoundException ex) {
            Console.log("[Friend/delete]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception ex) {
            Console.log("[Friend/delete]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Restricted
    @RequestMapping(value = "/get/all", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getAllFriend(@RequestHeader String Authorization) {
        try {
            List<FriendGroup> result = this.friendGroupService.getAllFriend(Authorization);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (EntityNotFoundException ex) {
            Console.log("[Friend/getAllFriend]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception ex) {
            Console.log("[Friend/getAllFriend]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Restricted
    @RequestMapping(value = "/get/reverse/all", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getAllReverseFriend(@RequestHeader String Authorization) {
        try {
            List<FriendGroup> result = this.friendGroupService.getAllReverseFriend(Authorization);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (EntityNotFoundException ex) {
            Console.log("[Friend/getAllReverseFriend]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception ex) {
            Console.log("[Friend/getAllReverseFriend]: " + ex.toString());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
