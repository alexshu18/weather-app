package com.alexshu.backend.citylist;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    public List<CityListResponse> getAllLists(@AuthenticationPrincipal Long userId) {
        return cityListService.getAllLists(userId);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public CityListResponse createList(@AuthenticationPrincipal Long userId, @RequestBody CreateCityListRequest request) {
        return cityListService.createList(userId, request.name());
    }

    @PatchMapping("/{id}")
    public CityListResponse renameList(@AuthenticationPrincipal Long userId, @PathVariable Long id, @RequestBody RenameCityListRequest request) {
        return cityListService.renameList(userId, id, request.name());
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteList(@AuthenticationPrincipal Long userId, @PathVariable Long id) {
        cityListService.deleteList(userId, id);
    }

    @PostMapping("/{listId}/cities/{cityId}")
    public CityListResponse addCityToList(@AuthenticationPrincipal Long userId, @PathVariable Long listId, @PathVariable Long cityId) {
        return cityListService.addCityToList(userId, listId, cityId);
    }

    @DeleteMapping("/{listId}/cities/{cityId}")
    public CityListResponse removeCityFromList(@AuthenticationPrincipal Long userId, @PathVariable Long listId, @PathVariable Long cityId) {
        return cityListService.removeCityFromList(userId, listId, cityId);
    }
}
