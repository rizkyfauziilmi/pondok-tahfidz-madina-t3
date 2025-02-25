"use client";

import React from "react";
import { motion } from "framer-motion";
import moment from "moment";

export interface TimelineEvent {
    date: Date;
    title: string;
    description: string;
}

interface TimelinesProps {
    events: TimelineEvent[];
    lineColor?: string;
    pointColor?: string;
    cardBgColor?: string;
    dateFormat?: string;
    sortOrder?: "asc" | "desc";
}

function TimelineItem({
    event,
    pointColor,
    cardBgColor,
    dateFormat,
}: {
    event: TimelineEvent;
    index: number;
    lineColor: string;
    pointColor: string;
    cardBgColor: string;
    dateFormat: string;
}) {
    const ref = React.useRef(null);

    return (
        <div ref={ref} className="mb-8 flex items-center">
            <div className="flex flex-col items-center mr-4 relative">
                <motion.div
                    className={`w-4 h-4 rounded-full bg-background border-2 border-muted-foreground ${pointColor.replace(
                        "bg-",
                        "border-"
                    )} absolute left-2 z-10`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                />
                <motion.div
                    className={`w-4 h-4 rounded-full ${pointColor} absolute left-2`}
                    initial={{ scale: 0, opacity: 1 }}
                    whileInView={{ scale: 2, opacity: 0 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                    }}
                />
            </div>
            <motion.div
                className={`${cardBgColor} rounded-lg p-4 shadow-md flex-1 ml-4`}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.5,
                }}
            >
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <span className="text-sm text-muted-foreground">
                        {moment(event.date).locale("id").format(dateFormat)}
                    </span>
                </div>
                <p className="text-muted-foreground">{event.description}</p>
            </motion.div>
        </div>
    );
}

export default function Timelines({
    events,
    lineColor = "bg-primary",
    pointColor = "bg-primary",
    cardBgColor = "bg-card",
    dateFormat = "MMMM d, yyyy",
    sortOrder = "desc",
}: TimelinesProps) {
    const sortedEvents = [...events].sort((a, b) =>
        sortOrder === "desc"
            ? b.date.getTime() - a.date.getTime()
            : a.date.getTime() - b.date.getTime()
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="relative">
                <motion.div
                    className={`absolute left-4 top-0 bottom-0 w-0.5 ${lineColor}`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5 }}
                />
                {sortedEvents.map((event, index) => (
                    <TimelineItem
                        key={index}
                        event={event}
                        index={index}
                        lineColor={lineColor}
                        pointColor={pointColor}
                        cardBgColor={cardBgColor}
                        dateFormat={dateFormat}
                    />
                ))}
            </div>
        </div>
    );
}
