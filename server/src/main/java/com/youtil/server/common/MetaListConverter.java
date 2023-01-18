package com.youtil.server.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Slf4j
@Converter
public class MetaListConverter implements AttributeConverter<List<ContentVo>, String> {

    @Override
    public String convertToDatabaseColumn(List<ContentVo> list) {
//        if(CollectionUtils.isNullOrEmpty(list)) {
//            return new String();
//        }
        if(!list.isEmpty() && list!=null) {
            return new String();
        }

        try {
            ObjectMapper objectMapper = new ObjectMapper();
//            ObjectMapper objectMapper = CommonUtils.getMapper();

            return objectMapper.writeValueAsString(list);
        } catch (JsonProcessingException e) {
            log.info("failed to parse database. data to json.");
            return new String();
        }
    }

    @Override
    public List<ContentVo> convertToEntityAttribute(String dbData) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return Arrays.asList(objectMapper.readValue(dbData, ContentVo[].class));
        } catch (JsonProcessingException e) {
            log.info("failed to parse database. data to json.");
            return Collections.emptyList();
        }
    }
}