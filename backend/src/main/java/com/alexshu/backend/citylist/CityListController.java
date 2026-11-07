package com.alexshu.backend.citylist;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lists")
public class CityListController {

    private final CityListService cityListService;

    public CityListController(CityListService cityListService) {
        this.cityListService = cityListService;
    }

    @GetMapping
    public List<CityListResponse> getAllLists() {
        return cityListService.getAllLists();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public CityListResponse createList(@RequestBody CreateCityListRequest request) {
        return cityListService.createList(request.name());
    }

    @PatchMapping("/{id}")
    public CityListResponse renameList(@PathVariable Long id, @RequestBody RenameCityListRequest request) {
        return cityListService.renameList(id, request.name());
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteList(@PathVariable Long id) {
        cityListService.deleteList(id);
    }

    @PostMapping("/{listId}/cities/{cityId}")
    public CityListResponse addCityToList(@PathVariable Long listId, @PathVariable Long cityId) {
        return cityListService.addCityToList(listId, cityId);
    }

    @DeleteMapping("/{listId}/cities/{cityId}")
    public CityListResponse removeCityFromList(@PathVariable Long listId, @PathVariable Long cityId) {
        return cityListService.removeCityFromList(listId, cityId);
    }
}
