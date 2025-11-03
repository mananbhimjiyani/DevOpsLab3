package com.example.util;
//
//import org.jfree.chart.ChartFactory;
//import org.jfree.chart.ChartPanel;
//import org.jfree.chart.JFreeChart;
//import org.jfree.chart.plot.PlotOrientation;
//import org.jfree.data.category.DefaultCategoryDataset;
//import org.cloudbus.cloudsim.Cloudlet;
//
//import javax.swing.*;
//import java.util.List;
//
public class ChartGenerator {
//
//    // Generate and display a bar chart for Cloudlet execution times
//    public static void createBarChart(List<Cloudlet> cloudletList, String algorithmName) {
//        JFreeChart barChart = ChartFactory.createBarChart(
//                "Cloudlet Execution Time (" + algorithmName + ")",
//                "Cloudlet ID",
//                "Execution Time (s)",
//                createDataset(cloudletList),
//                PlotOrientation.VERTICAL,
//                true, true, false
//        );
//
//        displayChart(barChart);
//    }
//
//    // Create dataset for chart plotting
//    private static DefaultCategoryDataset createDataset(List<Cloudlet> cloudletList) {
//        DefaultCategoryDataset dataset = new DefaultCategoryDataset();
//        for (Cloudlet cloudlet : cloudletList) {
//            if (cloudlet.getStatus() == Cloudlet.SUCCESS) {
//                dataset.addValue(
//                        cloudlet.getActualCPUTime(),
//                        "Execution Time",
//                        "Cloudlet " + cloudlet.getCloudletId()
//                );
//            }
//        }
//        return dataset;
//    }
//
//    // Display the chart in a JFrame
//    private static void displayChart(JFreeChart chart) {
//        JFrame frame = new JFrame("CloudSim Execution Chart");
//        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
//        frame.add(new ChartPanel(chart));
//        frame.pack();
//        frame.setLocationRelativeTo(null);
//        frame.setVisible(true);
//    }
}
//
