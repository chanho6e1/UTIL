package com.youtil.server.repository.todo;

import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.todo.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Map;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    @Query("SELECT t FROM Todo t WHERE t.goal = :goal order by t.dueDate asc")
    List<Todo> findByGoalId(@Param("goal") Goal goal);
    @Transactional
    @Modifying
    @Query("delete from Todo t where t.todoId = :todoId")
    void deleteByTodoId(@Param("todoId") Long todoId);
    @Query("SELECT t FROM Todo t WHERE t.dueDate = :dueDate")
    List<Todo> findByDate(String dueDate);

    @Transactional
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    @Query("delete from Todo t where t.goal.goalId = :goalId")
    void deleteByGoalId(Long goalId);

    @Query(value = "select min(t.due_date) minDate, max(t.due_date) maxDate " +
            "from goal g join todo t on g.goal_id = t.goal_id " +
            "where user_id = :userId "
            ,nativeQuery = true)
    Map<String, String> findTodoPeriod(Long userId);
}
