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
import java.util.Optional;

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

    @Query(value = "select g.goal_id goalId, min(t.due_date) minDate, max(t.due_date) maxDate " +
            "from goal g join todo t on g.goal_id = t.goal_id " +
            "where user_id = :userId " +
            "group by g.goal_id " +
            "order by g.goal_id asc "
            ,nativeQuery = true)
    List<Map<String, Object>> findTodoPeriod(Long userId);

    @Query(value = "select * " +
            "from goal g join todo t on t.goal_id = g.goal_id " +
            "where g.goal_id = :goal and :dueDate between g.start_date and g.end_date and t.todo_id = :todoId "
            ,nativeQuery = true)
    Optional<Todo> checkTodoPeriod(@Param("goal") Goal goal, @Param("dueDate") String dueDate, @Param("todoId") Long todoId);

    @Query(value = "select g.goal_id goalId, min(t.due_date) minDate, max(t.due_date) maxDate " +
            "from goal g join todo t on g.goal_id = t.goal_id " +
            "where g.goal_id = :goal " +
            "group by g.goal_id " +
            "order by g.goal_id asc "
            ,nativeQuery = true)
    Map<String, Object> findTodoPeriodByGoal(@Param("goal") Goal goal);

    @Query(value = "select t.todo_id " +
            "from goal g join todo t on g.goal_id = t.goal_id " +
            "where g.goal_id = :goal and t.state = false "
            ,nativeQuery = true)
    Optional<List<Object>> getTodoStateForGoal(@Param("goal") Goal goal);


    @Query(value = "select t.todo_id " +
            "from goal g join todo t on t.goal_id = g.goal_id " +
            "where g.goal_id = :goal and t.state = true"
            ,nativeQuery = true)
    Optional<List<Object>> checkTodoStateByGoal(@Param("goal") Goal goal);
}
