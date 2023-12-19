package com.example.api_agent_service.ReviewProject.Mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
@Mapper
public interface FeedbackMapper {

    @Select("SELECT review FROM TTOBAK_BADREVIEW WHERE gpt_answer = #{gpt_answer} AND productName = #{productName}")
    List<String> selectFeedbackReview(@Param("productName") String productName, @Param("gpt_answer") String gpt_answer);

    @Select("SELECT type FROM TTOBAK_BADREVIEW WHERE gpt_answer = #{gpt_answer} AND productName = #{productName}")
    List<String> selectFeedbackType(@Param("productName") String productName, @Param("gpt_answer") String gpt_answer);

    @Select("SELECT improvement FROM TTOBAK_BADREVIEW WHERE gpt_answer = #{gpt_answer} AND productName = #{productName}")
    List<String> selectFeedbackImprove(@Param("productName") String productName, @Param("gpt_answer") String gpt_answer);

    @Select ("SELECT distinct productName FROM TTOBAK_BADREVIEW")
    List<String> selectAnswerName();

}
