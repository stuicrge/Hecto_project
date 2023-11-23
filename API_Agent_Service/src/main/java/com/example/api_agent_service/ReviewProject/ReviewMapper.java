package com.example.api_agent_service.ReviewProject;


import com.example.api_agent_service.ReviewProject.Review;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Mapper
public interface ReviewMapper {

    // @Select("SELECT * FROM TEST_REVIEW ")
    // ArrayList<Review> findAll();

    //  @Select("SELECT * FROM TEST_REVIEW WHERE id = #{id}")
    //  Review findById(@Param("id") int id);


    @Select("SELECT COUNT(*) FROM TEST_TTOBAK_REVIEW WHERE answer = #{answer}")
    int findByAnswer(@Param("answer") String answer);

}
