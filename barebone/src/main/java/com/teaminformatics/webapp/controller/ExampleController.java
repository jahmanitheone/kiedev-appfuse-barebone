package com.teaminformatics.webapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.teaminformatics.synodex.model.AvailabilityStatus;

@Controller
public class ExampleController
{
	@RequestMapping(value="/availability", method=RequestMethod.GET)
	public @ResponseBody AvailabilityStatus getAvailability(@RequestParam String name) {
	    return AvailabilityStatus.available();
	}
}
