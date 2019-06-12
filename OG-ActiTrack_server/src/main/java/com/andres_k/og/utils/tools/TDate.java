package com.andres_k.og.utils.tools;

import com.andres_k.og.utils.data.Pair;

import java.time.LocalDateTime;

public class TDate {
    public static Pair<LocalDateTime, LocalDateTime> getDateRangeLimits(LocalDateTime date, Integer minute) {
        Pair<LocalDateTime, LocalDateTime> result = new Pair<>();

        int diff = date.getMinute() % minute;
        result.v1 = date.minusMinutes(diff);
        result.v2 = date.plusMinutes(minute - diff);
        return result;
    }
}
