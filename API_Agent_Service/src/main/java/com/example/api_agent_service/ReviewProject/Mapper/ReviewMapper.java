package com.example.api_agent_service.ReviewProject.Mapper;


import com.example.api_agent_service.ReviewProject.Review;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Mapper
public interface ReviewMapper {

    //또박케어 디비 sql문
    @Select("SELECT COUNT(gpt_answer) FROM TTOBAK_REVIEW WHERE productName = #{productName} AND gpt_answer = #{gpt_answer}")
    int selectAnswerCount(@Param("productName") String productName, @Param("gpt_answer") String gpt_answer);

    //락토핏 디비 sql문
    @Select ("SELECT COUNT(gpt_answer) FROM LACTOFIT_REVIEW WHERE name = #{name} AND gpt_answer = #{gpt_answer}")
    int compareAnswerCount(@Param("name") String name, @Param("gpt_answer") String gpt_answer);


}
