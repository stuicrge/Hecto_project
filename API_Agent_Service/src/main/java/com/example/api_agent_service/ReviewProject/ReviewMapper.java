package com.example.api_agent_service.ReviewProject;


import com.example.api_agent_service.ReviewProject.Review;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.ArrayList;

@Mapper
public interface ReviewMapper {

    // @Select("SELECT * FROM TEST_REVIEW ")
    // ArrayList<Review> findAll();

    //  @Select("SELECT * FROM TEST_REVIEW WHERE id = #{id}")
    //  Review findById(@Param("id") int id);

    @Select("SELECT COUNT(*) FROM TEST_REVIEW WHERE PorN = #{PorN}")
    int findByPorN(@Param("PorN") String PorN);




}
